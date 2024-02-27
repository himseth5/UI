import './checkbox.css'
function Checkbox(props) {
    const { label, defaultChecked } = props;
    return (
        <div className="checkbox-contnr">
          <label htmlFor="checkbox"> {label}</label>
          <input id='checkbox' type='checkbox' defaultChecked={defaultChecked} />
        </div>
    )
}

export default Checkbox;