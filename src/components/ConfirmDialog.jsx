const ConfirmDialog = ({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm text-gray-600">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          
          {/* CANCEL BUTTON (VISIBLE) */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              px-4 py-2
              rounded-lg
              border border-gray-300
              text-gray-700
              bg-white
              hover:bg-gray-100
              transition
            "
          >
            {cancelText}
          </button>

          {/* CONFIRM BUTTON */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              px-4 py-2
              rounded-lg
              text-white
              bg-red-600
              hover:bg-red-700
              transition
            "
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
