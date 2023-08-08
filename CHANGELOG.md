# Change Log

## [1.0.25] 2023-08-08
### Changes

- VOLT, added active components
- UpDate onSave Handler
  - save the page(s)
  - reload page (force INIT for active components)

## [1.0.24] 2023-08-08
### Changes

- Preview - Update assets for VOLT

## [1.0.23] 2023-08-08
### Changes

- Added VOLT Components
- Added Placeholders for Components

## [1.0.22] 2023-08-06
### Changes

- Fix `cross-kit` PREVIEW
  - by [deroude](https://github.com/deroude) 

## [1.0.21] 2023-08-06
### Changes

- Fix `cross-kit` PREVIEW
  - by [deroude](https://github.com/deroude) 

## [1.0.20] 2023-08-05
### Changes

- Add `style-pixel.css` (deleted by mistake)

## [1.0.19] 2023-08-05
### Changes

- UPD Preview 
  - works with different kits  

## [1.0.18] 2023-08-01
### Changes

- Integrate PIXEL
  - index-pixel.html
  - dist/style-pixel.css

## [1.0.16] 2023-08-01
### Changes

- Inject CFG in `DNDBuilder`
  - `backendUrl`, default value: "https://components-server.onrender.com/"
  - `uiKit`, default value: "bs5"

## [1.0.15] 2023-07-31
### Changes

- Fixes
  - Inject params on CDN usage
- Added Scroll to the components PANEL

## [1.0.14] 2023-07-30
### Changes

- UPD Package Version

## [1.0.13] 2023-07-30
### Changes

- Update LIB Interface
- Move Init outside package

## [1.0.12] 2023-07-29
### Changes

- Update Licensing 
- Stamp files LICENSE input
- CleanUP Assets

## [1.0.11] 2023-07-29
### Changes

- Assets CleanUP 

## [1.0.10] 2023-07-29
### Changes

- Backend CleanUP
- Builder 
  - CORE CleanUP
  - ENV, Read UI Kit (if provided) 
  
## [1.0.9] 2023-07-28
### Changes

- Update `package.json`
  - Added License 
  - Added Keywords

## [1.0.8] 2023-07-28
### Changes

- Update DOCS (readme)

## [1.0.7] 2023-07-25
### Changes

- Use Compressed Version in production
- Update DOCS (readme)

## [1.0.6] 2023-07-25
### Changes

- UPD Codebase 
- Added NPM & CDN support

## [1.0.5] 2023-07-25
### Changes

- Update Links:
  - [Free Page Builder DOCS](https://www.docs.simpllo.com/free-site-builder/intro)  
  - [Free Page Builder BLOG](https://www.docs.simpllo.com/blog)  

## [1.0.4] 2023-07-25
### Changes

- Added [DOCS Link](https://www.docs.simpllo.com/intro) and [Blog](https://www.docs.simpllo.com/blog)

## [1.0.3] 2023-07-24
### Changes

- Added [Community Link](https://discord.gg/AWh6TFcEwU) (Discord) 

## [1.0.2] 2023-07-23
### Changes

- UI Improvements

## [1.0.1] 2023-07-22
### Changes

- Added Netlify Deploy
- Codebase Improvements 

## [1.0.0] 2023-07-21
### Changes

- Deployed LIVE on [Simpllo - Free Website Builder](https://www.simpllo.com/)
- Improved Preview (multi-page)
- Download option

## [0.0.14] 2023-07-20
### Changes

- Added Multi-Page Support 
- Improved Preview

## [0.0.13] 2023-07-17
### Changes

- UI Improvements
  - Nicer GriD
  - Dynamic Sidebar Fixes
- LIVE Updates:
  - [Components Server - BS5](https://components-server.onrender.com/kits/bs5/)
  - [Dnd Builder](https://rocket-builder.onrender.com/)  

## [0.0.12] 2023-07-17
### Changes

- DOCS Update (readme)

## [0.0.11] 2023-07-17
### Changes

- Dynamic Sidebar
- LocalStorage for Speed
- Overall UI Improvements

## [0.0.10] 2023-07-16
### Changes

- UI Enhancements

## [0.0.9] 2023-07-16
### Changes

- Update UI
  - Add more styles 

## [0.0.8] 2023-07-16
### Changes

- `Component Customization`, coded by [topstar210](https://github.com/topstar210)
  - Text & Links

## [0.0.7] 2023-07-13
### Changes

- UPD `Kits JSON`
  - Embed `BASE64 Representation` for all components

```json
...(truncated)...
    "general": {
        "card.html": "PGRpdiBpZD0iZHJhZ2dhYmxlLWRpdi0yIiBjbGFzcz0iY2FyZCBkcmFnZ2FibGUiIHN0eWxlPSJ3aWR0aDogMThyZW07IiBkcmFnZ2FibGU9InRydWUiIGRhdGEtdHlwZT0iZGl2IgogICAgZGF0YS1pbmZvPSJESVYgQ29tcG9uZW50Ij4KICAgIDxkaXYgY2xhc3M9ImNhcmQtaGVhZGVyIj4KICAgICAgICA8c3Ryb25nPlJFTU9URTwvc3Ryb25nPiBDb21wb25lbnQKICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iY2FyZC1ib2R5Ij4KICAgICAgICA8aDUgY2xhc3M9ImNhcmQtdGl0bGUiPgogICAgICAgICAgICBTaW1wbGUgPGEgaHJlZj0iaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNS4wL2NvbXBvbmVudHMvY2FyZC8jaGVhZGVyLWFuZC1mb290ZXIiIHRhcmdldD0iX2JsYW5rIj5Cb290c3RyYXA1IENhcmQ8L2E+CiAgICAgICAgPC9oNT4KICAgICAgICA8cCBjbGFzcz0iY2FyZC10ZXh0Ij4KICAgICAgICAgICAgVGhpcyBjb21wb25lbnQgaXMgcHVsbGVkIGF0IHJ1bnRpbWUgZnJvbSBhIFJlbW90ZSBTZXJ2ZXIKICAgICAgICA8L3A+CiAgICAgICAgPGEgdGFyZ2V0PSJfYmxhbmsiIGhyZWY9Imh0dHBzOi8vY29tcG9uZW50cy1zZXJ2ZXIub25yZW5kZXIuY29tL2tpdHMvIiBjbGFzcz0iYnRuIGJ0bi1wcmltYXJ5Ij5BY2Nlc3MgdGhlIFNlcnZlcjwvYT4KICAgIDwvZGl2Pgo8L2Rpdj4="
    }
...(truncated)...    
```  

## [0.0.6] 2023-07-13
### Changes

- Update DOCS (readme)

## [0.0.5] 2023-07-13
### Changes

- Uses Remote Components Server:
  - https://components-server.onrender.com/kits/
- Added More controls for Components
  - UP, Down, and delete

## [0.0.4] 2023-07-13
### Changes

- Switch from React to VanillaJS
- Added Components Server
  - powered by Flask

## [0.0.3] 2023-07-12
### Changes

- Minimal DnD Capabilities
- Added [LICENSE](./LICENSE.md) - `EULA Terms``
- Activate CI/CD via Render
  - [Rocket Builder](https://rocket-builder.onrender.com/)

## [0.0.2] 2023-07-04
### Changes

- Codebase refactoring

## [0.0.1] 2023-06-28
### Changes

- Initial Codebase
  - Mantis MUI (free version)
