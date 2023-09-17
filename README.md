# graphics

The **graphics** repo is a standalone frontend app used to render on-screen graphics in
OBS overlays. It's maintained separately from the main webapp in order to ensure that
the respective frontend codebases are as lean and self-contained as possible: we don't
deploying a change to the OBS overlay to incur any potential maintenance burdens for
the main website, or vice versa.

## Prerequisites

- Install [nvm](https://github.com/nvm-sh/nvm) or
  [nvm-windows](https://github.com/coreybutler/nvm-windows)

## Initial setup

1. Run `nvm install $(cat .nvmrc)` to ensure that the required version of Node is
   installed
2. Run `nvm use` to select that version of Node
3. Run `npm install` to install dependencies

## Development

Run `nvm run dev` to start a development server running at http://localhost:8081/. You
can visit this URL directly to test it in a browser, or you can add it as a temporary
Browser Source in OBS. Either option should support hot reload.
