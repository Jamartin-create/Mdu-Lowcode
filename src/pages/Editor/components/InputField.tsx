import {FunctionalComponent} from 'vue';

interface Props { 
    list: any[];
    modelValue: any;
}

type Emit = {

}

const InputField: FunctionalComponent<Props, Emit> = (props, ctx) => {
    const { list, modelValue } = props;
    console.log(modelValue);
    const inputFields = list.map(item => {
        if(item.type == 'text'){
            return (
                <v-text-field
                    v-model={modelValue[item.name]}
                    required
                    label={item.text}
                ></v-text-field>
            )
        }else if(item.type == 'select'){
            return (
                <div>测试</div>
            )
        }
    })
    return (
        <v-container>
            {inputFields}
        </v-container>
    )
}

export default InputField;