export default {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow all comments',
      },
      schema: [],
    },
    create(context) {
      return {
        Program(node) {
          const comments = context.getSourceCode().getAllComments();
          for (const comment of comments) {
            context.report({
              loc: comment.loc,
              message: '❌ No comment: "{{value}}"',
              data: {
                value: comment.value.trim(),
              },
            });
          }
        },
      };
    },
  };
  