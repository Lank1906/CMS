export default {
    meta: {
      type: 'problem',
      docs: {
        description: 'Remove all comments from code',
      },
      fixable: 'code',
      schema: [],
    },
    create(context) {
      return {
        Program() {
          const comments = context.getSourceCode().getAllComments();
          for (const comment of comments) {
            context.report({
              loc: comment.loc,
              message: '❌ N comment: "{{value}}"',
              data: {
                value: comment.value.trim(),
              },
              fix(fixer) {
                return fixer.remove(comment);
              },
            });
          }
        },
      };
    },
  };
  