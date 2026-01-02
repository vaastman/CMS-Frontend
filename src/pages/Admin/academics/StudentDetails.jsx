import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Student Details</h1>

      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-2 gap-6">
        <p><b>Name:</b> Sumit Kumar</p>
        <p><b>Reg No:</b> TPS202467066</p>
        <p><b>Course:</b> BCA</p>
        <p><b>Session:</b> 2024-2028</p>
        <p><b>Father's Name:</b> Manoj Prasad</p>
        <p><b>DOB:</b> 01 Jan 2000</p>
        <p><b>Status:</b> Admitted</p>
      </div>
    </div>
  );
};

export default StudentDetails;
