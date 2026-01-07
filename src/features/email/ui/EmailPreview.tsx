interface EmailPreviewProps {
  htmlPreview: string;
  copySuccess: boolean;
  onCopyAndCreateEmail: () => void;
  onCreatePlainEmail: () => void;
}

export function EmailPreview({
  htmlPreview,
  copySuccess,
  onCopyAndCreateEmail,
  onCreatePlainEmail,
}: EmailPreviewProps) {
  return (
    <div className="space-y-4">
      {/* HTML预览 - 始终显示 */}
      {htmlPreview && (
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className="bg-gray-100 px-4 py-2">
            <h3 className="font-medium text-gray-700">邮件预览（带格式）</h3>
          </div>
          <div
            className="p-6 bg-white"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          />
        </div>
      )}

      {/* 按钮区域 */}
      {htmlPreview && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCopyAndCreateEmail}
            className={`flex-1 px-6 py-2.5 rounded-md font-medium transition-colors ${
              copySuccess
                ? 'bg-green-500 text-white'
                : 'bg-primary text-white hover:bg-opacity-90'
            }`}
          >
            {copySuccess ? '✓ 已复制' : '创建新邮件之后粘贴内容'}
          </button>
          <button
            type="button"
            onClick={onCreatePlainEmail}
            className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors text-sm"
          >
            创建不带格式以及签名的邮件
          </button>
        </div>
      )}

      {/* 功能说明 */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          💡 <strong>使用说明：</strong>推荐使用"创建新邮件之后粘贴内容"以保留格式和签名
        </p>
        <ul className="mt-2 ml-6 text-sm text-blue-700 list-disc space-y-1">
          <li><strong>创建新邮件之后粘贴内容</strong>：复制带格式的内容，然后打开新邮件，可手动粘贴（保留格式和签名）</li>
          <li><strong>创建不带格式以及签名的邮件</strong>：直接打开邮件客户端，内容为纯文本格式</li>
        </ul>
      </div>
    </div>
  );
}
