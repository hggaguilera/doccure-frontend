// import { Input } from "antd";

// const { TextArea } = Input;

function TextField({ label, name, register, error, isRequired = true }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {isRequired ? <span>*</span> : null}
      </label>
      <textarea id={name} className="form-control" rows={6} {...register(name)} />
      {/* <TextArea
        id={name}
        autoSize={{ minRows: 6, maxRows: 6 }}
        onChange={(evt) => setValue(name, evt.target.value)}
        {...register(name)}
      /> */}
      {error && <p className="invalid">{error}</p>}
    </div>
  );
}

export default TextField;
