import {
  Application,
  bold,
  createServerTimingMiddleware,
  cyan,
  green,
  HttpError,
  IServerTimingState,
  join,
  red,
  Router,
  Status,
} from "./deps.ts";

import { render } from "./pages/_app.tsx";
import { getTableStateById, handleSocket } from "./lobby/lobby.ts";
import { transform } from "./assets.ts";

const PORT = parseInt(Deno.env.get("PORT") || "8080");
const __dirname = new URL(".", import.meta.url).pathname;
const publicFolderPath = join(__dirname, "..", "public");
const scriptFolderPath = join(__dirname, "client/");

const app = new Application();

app.use(createServerTimingMiddleware());

// Error handler middleware
app.use(async (context, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof HttpError) {
      // deno-lint-ignore no-explicit-any
      context.response.status = e.status as any;
      if (e.expose) {
        context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>${e.status} - ${e.message}</h1>
              </body>
            </html>`;
      } else {
        context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>${e.status} - ${Status[e.status]}</h1>
              </body>
            </html>`;
      }
    } else if (e instanceof Error) {
      context.response.status = 500;
      context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>500 - Internal Server Error</h1>
              </body>
            </html>`;
      console.log("Unhandled Error:", red(bold(e.message)));
      console.log(e.stack);
    }
  }
});

// Logger
app.use(async (context, next) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(
    `${green(context.response.status.toString())} ${
      green(context.request.method)
    } ${cyan(context.request.url.pathname)} - ${
      bold(
        String(rt),
      )
    }`,
  );
});

// Response Time
app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Create an oak Router
const router = new Router<IServerTimingState>();

// Handle live reload websocket connection
router.get("/_r", async (ctx) => {
  await ctx.upgrade();
});

// Handle game websocket connection
router.get("/ws", async (ctx) => {
  const sock = await ctx.upgrade();
  handleSocket(sock);
});

// Handle client scripts
router.get("/scripts/(.*).js", async (context) => {
  const { timeStart, timeEnd } = context.state;
  console.log(">>>", context.request.url.pathname);

  timeStart("babel");
  const scriptPath = join(scriptFolderPath, context.params[0]) + ".ts";
  const { code, metadata } = await transform(scriptPath);
  console.log(metadata);
  context.response.type = "application/javascript";
  context.response.body = code;
  timeEnd("babel");
});

// Handle main route
router.get("/", (context) => {
  console.log(">>>", context.request.url.pathname);

  context.state.timeSync("render", () => {
    context.response.body = render({});
  });
});

// Handle table route
router.get("/m/alpha", (context) => {
  const { timeStart, timeEnd, timeSync } = context.state;
  console.log(">>>", context.request.url.pathname);

  timeStart("fetch");
  const alphaTable = getTableStateById("alpha");
  timeEnd("fetch");

  timeSync("render", () => {
    context.response.body = render({ game: alphaTable });
  });
});

app.use(router.routes());
app.use(router.allowedMethods());

// Static content under /public
app.use(async (context) => {
  console.log(`>>> static try /public${context.request.url.pathname}`);
  await context.send({ root: publicFolderPath });
});

// Log hello
app.addEventListener("listen", () => {
  console.log(`Listening on ${cyan(`http://localhost:${PORT}`)}`);
});

// Start server
await app.listen({ port: PORT });
