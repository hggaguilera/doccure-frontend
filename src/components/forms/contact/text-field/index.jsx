import { Input } from "antd";

const { TextArea } = Input;

function TextField({ label, name, register, error, setValue, isRequired = true }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {isRequired ? <span>*</span> : null}
      </label>
      <TextArea
        id={name}
        autoSize={{ minRows: 6, maxRows: 6 }}
        {...register(name)}
        onChange={(evt) => setValue(name, evt.target.value)}
      />
      {error && <p className="invalid">{error}</p>}
    </div>
  );
}

export default TextField;
