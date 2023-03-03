import { defineComponent, ref,PropType, FunctionalComponent, VNode } from 'vue'

export const Confirm = defineComponent({
    props: {
        visible: {
            type: Boolean,
        }, title: {
            type: String, 
        }, content: {
            type: String,
        }, onClose: {
            type: Function as PropType<() => void>,
        }, onConfirm: {
            type: Function as PropType<() => void>,
        }
    },
    setup(props){
        return ()=>
        props.visible && (
            <v-dialog v-model="visible" persistent width="auto">
            <v-card>
                <v-card-title class="text-h5"> {props.title} </v-card-title>
                <v-card-text>{props.content}</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" onClick={props.onClose}>
                    取消
                </v-btn>
                <v-btn color="green-darken-1" variant="text" onClick={props.onConfirm}>
                    确认
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        )
    }
})

interface Options {
    title?: string;
    content?: string;
}

export function useConfirm(options: Options = {}) {
    const visible = ref<boolean>(false);
    const open = () => (visible.value = true);
    const close = () => (visible.value = false);
    const confirm = () => {
        return 
    }
    const RenderDialog: FunctionalComponent = () => {
        return (
            <Confirm
                visible = {visible.value}
                title = {options.title}
                content = {options.content}
                onClose = {close}
                onConfirm = {confirm}
            />
        )
    }
    return {
        open, close, confirm, RenderDialog
    }
}