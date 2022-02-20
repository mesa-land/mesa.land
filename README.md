# Mesa Land 

Play and create amazing online card games!

Start now: https://mesa.land

### Getting started

Install [denon](https://deno.land/x/denon@2.5.0)

Create a `.env` file to enable live reload: 

`echo "ENABLE_LIVE_RELOAD=true" > .env`

`denon dev`

### Note about JSX pragma

`/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/` in every jsx component is unfortunately required to deploy on Deno Deploy — they don't support import maps yet. 
