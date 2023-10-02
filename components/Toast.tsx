export default function Toast({ children, show = false, type }) {
  let bg_toast = ""
  if (type == "danger") {
    bg_toast = "bg-red-500"
  } else if (type == "success") {
    bg_toast = "bg-green-500"
  } else if (type == "info") {
    bg_toast = "bg-cyan-500"
  }
  return (
    <div
      className={`fixed flex items-center w-full max-w-xs ${bg_toast} p-4 space-x-4 divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800 z-50 ${!show && "hidden"
        }`}
    >
      <div className="ml-3 text-sm font-normal text-white">{children}</div>
    </div>
  );
}
