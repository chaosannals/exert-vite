import { h } from "vue";


const FunCell = (props, context) => {
    console.log('fc', props, context);
    if (props.sr) {
        return h(props.sr, props.sd);
    }
};

FunCell.props = ['pindex', 'prop2', 'sr', 'sd'];
FunCell.emits = ['click', 'event2'];

export default FunCell;