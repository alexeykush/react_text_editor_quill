import {fontLabelFormatter} from "../../../utils";

const defaultColors = [
    'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
    'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
    'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
    'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
    'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
    'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
    'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
    'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
    'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
    'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
    'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
    'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
].map(value => ({value}));

export const sizes = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px'];
const selectedSize = 2;

export const fonts = ["arial", "mirza", "roboto", "sans-serif", "serif", "monospace"];
const selectedFont = 0;

export const toolbarConfig = [
    {
        label: 'Formats',
        type: 'group',
        items: [
            {
                type: "header",
                label: "header",
                items: ["", 1, 2, 3, 4, 5, 6].map(item => ({label: item, value: item}))
            },
            {
                label: 'font',
                type: 'font',
                items: fonts.map(fontLabelFormatter(selectedFont))
            },
            {
                label: 'size',
                type: 'size',
                items: sizes.map((size, i) => ({label: size, value: size, selected: i === selectedSize}))
            },
            {
                label: 'alignment',
                type: 'align',
                items: [
                    {label: '', value: '', selected: true},
                    {label: '', value: 'center'},
                    {label: '', value: 'right'},
                    {label: '', value: 'justify'}
                ]
            }
        ]
    },
    {
        label: 'Text',
        type: 'group',
        items: [
            {type: 'bold', label: 'bold'},
            {type: 'italic', label: 'italic'},
            {type: 'strike', label: 'strike'},
            {type: 'underline', label: 'underline'},
            {type: "blockquote", label: "blockquote"},
            {type: 'color', label: 'color', items: defaultColors},
            {type: 'background', label: 'bgColor', items: defaultColors}
        ]
    },
    {
        label: 'Blocks',
        type: 'group',
        items: [
            {type: 'list', value: 'bullet', label: "bullet"},
            {type: 'list', value: 'ordered', label: "ordered"},
            {type: 'indent', value: '-1', label: "indentLeft"},
            {type: 'indent', value: '+1', label: "indentRight"}
        ]
    },
    {
        label: 'Blocks',
        type: 'group',
        items: [
            {type: 'image', label: 'image'},
            {type: 'video', label: "video"},
            {type: 'link', label: 'link'}
        ]
    },
    {
        label: 'Blocks',
        type: 'group',
        items: [
            {type: 'clean', label: 'clean'}
        ]
    },
    {
        label: 'Blocks',
        type: 'group',
        items: [
            {type: 'historyPrev', label: 'historyPrev'},
            {type: 'historyNext', label: 'historyNext'}
        ]
    }
];