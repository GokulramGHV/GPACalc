export default function LabelInput(props) {
  return (
    <div className={`form-floating text-ellipsis ${props.className}`}>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        className="input-blue"
        placeholder={props.placeholder}
      />
      <label for={props.id} class="text-gray-500 overflow-clip">
        {props.labelText}
      </label>
    </div>
  );
}
