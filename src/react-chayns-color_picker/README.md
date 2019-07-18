# ColorPicker #

The ColorPicker-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest

## Usage ##

You have to import the component first:

```jsx harmony
import { ColorPicker } from 'chayns-components';
```

You can use the ColorPicker like in the [example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-color_picker/Example.jsx).


## Props ##
You can set the following props on a ColorPicker element:

| Property      | Description                                                                             | Type       |
|---------------|-----------------------------------------------------------------------------------------|------------|
| color         | The preselected color                                                                   | String, hsv(a)- or rgb(a)255-object |
| className     | ClassNames that will be set on the children wrapper                                     | string     |
| bubbleClassName| ClassNames that will be set on the bubble                                              | string     |
| style         | Styles assigned to the children wrapper                                                 | object     |
| bubbleStyle   | Styles assigned to the bubble                                                           | object     |
| bubblePosition | Position of the bubble. Valid positions are listed in Bubble.position                  | number     |
| parent        | Node the bubble will be rendered into                                                   | DOM-Element|
| onChange      | onChange - Callback                                                                     | function   |
| onChangeEnd   | onChange - Callback                                                                     | function   |
| transparency  | Adds the transparency slider                                                            | bool       |

**Note:** The color from the callback is in the hsva color model. You can convert it to the hex(a)- or rgb(a)-model using the [helper functions](https://github.com/TobitSoftware/chayns-components/blob/master/src/react-chayns-color_picker/utils/colorHelper.js).