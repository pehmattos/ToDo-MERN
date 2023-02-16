import { useState } from "react";

function Item({ item, updateDocument, deleteDocument }) {
  const [tempText, setTempTest] = useState("");

  return (
    <div className="row">
      <input
        type="checkbox"
        readOnly={!item.active}
        onClick={() => {
          updateDocument({ ...item, active: !item.active });
        }}
      />

      {item.edit || item.text === "" ? (
        <input
          type="text"
          placeholder={item.text}
          onChange={(e) => {
            setTempTest(e.target.value);
          }}
          onBlur={() => {
            updateDocument({ ...item, text: tempText, edit: false });
          }}
        ></input>
      ) : (
        <span
          onClick={() => {
            updateDocument({ ...item, edit: true });
          }}
          style={item.active ? {} : { textDecoration: "line-through" }}
        >
          {item.text}
        </span>
      )}

      <button
        onClick={() => {
          deleteDocument(item);
        }}
      >
        Apagar
      </button>
    </div>
  );
}

export default Item;
// parametros se tornam propriedades do componente
