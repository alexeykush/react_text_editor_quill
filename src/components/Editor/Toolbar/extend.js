import { Quill } from "react-quill";

import {fonts, sizes} from "./statics";

const Size = Quill.import('attributors/style/size');
Size.whitelist = sizes;
Quill.register(Size, true);

const Font = Quill.import('attributors/style/font');
Font.whitelist = fonts;
Quill.register(Font, true);