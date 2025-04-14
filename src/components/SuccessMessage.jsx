import styles from "./successMessage.module.css";

function SuccessMessage({ setSuccess, message }) {
  return (
    <div className={styles.successMessage}>
      <h1>{message}</h1>
      <button onClick={() => setSuccess(false)}>Confirm</button>
    </div>
  );
}

export default SuccessMessage;
