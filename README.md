### This is an React Unsplash accelerator

React-Unsplash streamlines the process of integrating an Unsplash photo library into your projects, allowing you to focus on developing the features that matter most.

### Installation

```terminal
npm i react-unsplash
```

```terminal
yarn add react-unsplash
```

```terminal
pnpm add react-unsplash
```

### How to use

```jsx
import ReactUnsplash from 'react-unsplash'
[...]
<ReactUnsplash
  initValue={search}
  loading={isLoading}
  onSearch={onSearch}
  onCommit={onCommit}
  onSelect={onSelect}
  onClose={handleClose}
  images={results}
  handleLoadMore={handleNextPage}
  hasMore={hasNext}
  displayMode="normal"
  cols={isMobile ? 2 : 3}
/>
[...]
```

### Options

| Name        | Value                                  | Default   | Required | Description                                                      |
| ----------- | -------------------------------------- | --------- | -------- | ---------------------------------------------------------------- |
| displayMode | normal \| popup                        | normal    | no       | While "popup" this component will be displayed in a pop-up modal |
| initValue   | string                                 | ''        | no       | Init value that will invoke onSearch\|onCommit callbacks         |
| onSearch    | (value: string) => void \| undefined   | undefined | no       | Callback function when input search changes                      |
| onCommit    | ((value: string) => void) \| undefined | undefined | no       | Callback function when hitting enter                             |
| onSelect | (image: any) => void | | yes | Callback function when a photo is clicked | 
| images |  any[] | [] | yes | Should be [Unsplash images object](https://unsplash.com/documentation#response-16) | 
| loading | boolean \|undefined | undefined | no | An indicator of loading state, when searching for photos | 
| handleLoadMore | (() => void) \| undefined | undefined | no | Callback function when the last image is scrolled into view | 
|hasMore | boolean \| undefined | undefined | no | If true, handleLoadMore will be fired when the last image is scrolled into view| 
|open | boolean \| undefined | undefined | yes (only when displayMode is "popup") | When true, the popup is shown |
|onClose |  (() => void) \| undefined | undefined | yes (only when displayMode is "popup") | Callback function when the popup is requested to close |
| width | number \| undefined | undefined | no | Specify the width of the component | 
| height | number \| undefined | undefined | no | Specify the height of the component | 
| cols | number \| undefined | auto | no | Specify the number of images columns in the gallery |
| gap | number \| undefined | 8(px) | no | Specify the gap between images |

