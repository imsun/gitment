export function english(Text) {
    return Text;
}

export function chinese(Text) {
    return ({
        'Issue Page': '所有评论',
        'Initialize Comments': '初始化本文的评论页',
        'Loading comments...': '加载评论...',
        'Error: Comments Not Initialized': '(未开放评论)',
        'No Comment Yet': '(还没有评论)',
        'Previous': '上一页',
        'Next': '下一页',
        'Nothing to preview': '（没有预览）',
        'Loading preview...': '加载预览...',
        'Submitting...': '正在提交评论...',
        'Comment': '发送',
        'Write': '评论',
        'Preview': '预览',
        'Logging in...': '登入中...',
        'Leave a comment': '(发表评论)',
        'Login': '登入',
        'Logout': '退出'
    }[Text] || Text);
}

export default english;