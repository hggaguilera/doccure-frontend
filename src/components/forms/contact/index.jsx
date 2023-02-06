import React from "react";
import Input from "./input";
import TextField from "./text-field";

function ContactForm({ register, handleSubmit, onSubmit, errors, setValue, disabled }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <Input
            label="Nombre"
            name="from_name"
            type="text"
            register={register}
            error={errors?.from_name?.message}
            isRequired
          />
        </div>
        <div className="col-md-6">
          <Input
            label="Email"
            name="reply_to"
            type="email"
            register={register}
            error={errors?.reply_to?.message}
            isRequired
          />
        </div>
        <div className="col-md-12">
          <Input
            label="Asunto"
            name="subject"
            type="text"
            register={register}
            error={errors?.subject?.message}
            isRequired={false}
          />
        </div>
        <div className="col-md-12">
          <TextField
            label="Comentarios"
            name="comments"
            register={register}
            error={errors?.comments?.message}
            setValue={setValue}
            isRequired
          />
        </div>
      </div>
      <button type="submit" className="btn bg-primary" disabled={disabled}>
        Enviar Mensaje
      </button>
    </form>
  );
}

export default ContactForm;
