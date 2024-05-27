import { useState } from "react";

export default function AssignmentForm({ assignment, onSave }) {
  const [formData, setFormData] = useState({
    benefit_id: assignment?.benefit_id || "",
    recipient_id: assignment?.recipient_id || "",
    quantity: assignment?.quantity || 0,
    amount: assignment?.amount || 0,
    status: assignment?.status || "",
    enrollment_date: assignment?.enrollment_date || "",
    expiry_date: assignment?.expiry_date || "",
    withdrawal_date: assignment?.withdrawal_date || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Benefit ID</label>
        <input type="number" name="benefit_id" value={formData.benefit_id} onChange={handleChange} />
      </div>
      <div>
        <label>Recipient ID</label>
        <input type="number" name="recipient_id" value={formData.recipient_id} onChange={handleChange} />
      </div>
      <div>
        <label>Quantity</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
      </div>
      <div>
        <label>Amount</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
      </div>
      <div>
        <label>Status</label>
        <input type="text" name="status" value={formData.status} onChange={handleChange} />
      </div>
      <div>
        <label>Enrollment Date</label>
        <input type="date" name="enrollment_date" value={formData.enrollment_date} onChange={handleChange} />
      </div>
      <div>
        <label>Expiry Date</label>
        <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} />
      </div>
      <div>
        <label>Withdrawal Date</label>
        <input type="date" name="withdrawal_date" value={formData.withdrawal_date} onChange={handleChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}