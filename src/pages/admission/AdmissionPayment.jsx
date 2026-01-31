import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/api/api";

const AdmissionPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const feeBreakdown = [
    { head: "TUITION", label: "Tuition Fee", amount: 20000 },
    { head: "DEVELOPMENT", label: "Development Fee", amount: 5000 }
  ];

  const total = feeBreakdown.reduce((sum, item) => sum + item.amount, 0);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const payload = {
        admissionId: id,
        studentId: localStorage.getItem("studentId"),
        totalAmount: total,
        gateway: "MANUAL",
        txnId: `TXN-${Date.now()}`,
        referenceNo: `REF-${Date.now()}`,
        breakups: feeBreakdown.map(({ head, amount }) => ({ head, amount }))
      };

      const res = await api.post("/payments", payload);
      toast.success("Payment initiated");

      await api.patch(`/payments/${res.data.data.payment.id}/status`, {
        status: "SUCCESS"
      });

      toast.success("Payment successful");
      navigate(`/admin/admissions/${id}`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-in {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }

        .fee-row:hover {
          background: rgba(99, 102, 241, 0.03);
        }

        .payment-btn {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
          position: relative;
          overflow: hidden;
        }

        .payment-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .payment-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .security-badge {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-8 ${animateIn ? 'animate-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Admission Payment
          </h1>
          <p className="text-slate-600 font-medium">
            Complete your admission fee payment
          </p>
        </div>

        {/* Main Card */}
        <div 
          className={`glass-card rounded-2xl shadow-2xl overflow-hidden ${animateIn ? 'animate-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          {/* Admission ID Badge */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">Admission ID</p>
                <p className="text-white text-xl font-bold tracking-wide">{id}</p>
              </div>
              <div className="security-badge px-4 py-2 rounded-full">
                <div className="flex items-center gap-2 text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Fee Breakdown
            </h2>

            <div className="space-y-3 mb-6">
              {feeBreakdown.map((item, index) => (
                <div 
                  key={item.head}
                  className={`fee-row flex justify-between items-center p-4 rounded-xl border border-slate-200 transition-all duration-300 ${animateIn ? 'fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{item.head}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-slate-800">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div 
              className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 mb-6 ${animateIn ? 'fade-in' : 'opacity-0'}`}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">Total Amount</p>
                  <p className="text-white text-3xl font-bold" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    ₹{total.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-currency-rupee" viewBox="0 0 16 16">
  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
</svg>

                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div 
              className={`bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 ${animateIn ? 'fade-in' : 'opacity-0'}`}
              style={{ animationDelay: '0.6s' }}
            >
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Payment Information</p>
                  <p className="text-sm text-blue-800">
                    Your payment is processed securely. A confirmation receipt will be sent to your registered email address.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`payment-btn w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative ${animateIn ? 'fade-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.7s' }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pay ₹{total.toLocaleString('en-IN')}
                    </>
                  )}
                </span>
                {loading && <div className="absolute inset-0 shimmer rounded-xl"></div>}
              </button>

              <button
                onClick={() => navigate(-1)}
                disabled={loading}
                className={`w-full py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${animateIn ? 'fade-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.8s' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Footer Trust Badges */}
        <div 
          className={`mt-8 flex justify-center items-center gap-6 text-slate-600 ${animateIn ? 'fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.9s' }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">256-bit SSL</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">PCI Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Verified Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPayment;