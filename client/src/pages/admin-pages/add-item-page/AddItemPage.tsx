import React, {useState} from "react";

interface IForm{
    clotheName: string,
    type: string,
    price: number,
    description: string
}

export const AddItemPage: React.FunctionComponent = () => {

    const [form, setForm] = useState<IForm>({
        clotheName: "",
        type: "",
        price: 0,
        description: ""
    });


    const onChangeHandler = (e:any) => {
        const { name } = e.target as HTMLButtonElement;
        const { value } = e.target as HTMLButtonElement;
        setForm({
            ...form,
            [name]: value
        })
        console.log(form);
    }

    return (
        <div className="container add_container">
            <label>Тип товара</label>
            <select onChange={onChangeHandler} name="type" className="browser-default">
                <option value="" defaultValue="tshirts">Выберите тип товара</option>
                <option value="tshirts">Футболки</option>
                <option value="hoodies">Худи</option>
                <option value="pants">Штаны</option>
                <option value="polo">Поло</option>
            </select>
        <div className="row">
            <div className="input-field col s6">
                <input name="clotheName"
                       onChange={onChangeHandler}
                       id="clothe_name"
                       type="text"
                       className="validate"
                       placeholder="Введите наименование товара"
                />
            </div>
        </div>
            <div className="row">
                <div className="input-field col s6">
                    <input name="description"
                           onChange={onChangeHandler}
                           id="clothe_description"
                           type="text"
                           className="validate"
                           placeholder="Введите описание товара"
                    />
                </div>
            </div>
        </div>

    )
}