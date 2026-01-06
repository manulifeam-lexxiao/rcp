interface EmailPreviewProps {
  htmlPreview: string;
  showPreview: boolean;
  copySuccess: boolean;
  onTogglePreview: () => void;
  onCopyHtml: () => void;
}

export function EmailPreview({
  htmlPreview,
  showPreview,
  copySuccess,
  onTogglePreview,
  onCopyHtml,
}: EmailPreviewProps) {
  return (
    <div>
      {/* 功能说明 */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          💡 <strong>使用说明：</strong>您可以选择以下任一方式发送邮件：
        </p>
        <ul className="mt-2 ml-6 text-sm text-blue-700 list-disc space-y-1">
          <li><strong>创建邮件</strong>：直接打开邮件客户端（纯文本格式，可自动添加签名）</li>
          <li><strong>显示预览 + 复制</strong>：查看带格式的HTML预览，复制后手动新建邮件粘贴（保留格式和签名）</li>
        </ul>
      </div>

      {/* 预览切换按钮 */}
      <div className="mt-4">
        <button
          type="button"
          onClick={onTogglePreview}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          {showPreview ? '隐藏预览' : '显示预览'}
        </button>
      </div>

      {/* HTML预览 */}
      {showPreview && htmlPreview && (
        <div className="mt-6 border border-gray-300 rounded-md overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <h3 className="font-medium text-gray-700">邮件预览（带格式）</h3>
            <button
              onClick={onCopyHtml}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                copySuccess
                  ? 'bg-green-500 text-white'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {copySuccess ? '✓ 已复制' : '复制内容'}
            </button>
          </div>
          <div
            className="p-6 bg-white"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          />
        </div>
      )}
    </div>
  );
}
