import React, { PureComponent } from 'react';
import { Form, Input, Button, Card, message, Icon, Upload } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { host } from '../../utils/config';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

@Form.create()
export default class HealthyDocument extends PureComponent {
  state = {
    fileList: [],
  }


  handleSubmit = (e) => {
    const { submit } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        submit(values);
      }
    });
  }

  render() {
    const { fileList } = this.state;
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const props = {
      name: 'file',
      accept: 'image/*',
      multiple: false,
      fileList,
      listType: 'picture-card',
      action: `${host}/ipfs/uploadFile`,
      headers: { Authorization: `Bearer ${localStorage.jwt}` },
      onChange: (info) => {
        this.setState({
          fileList: info.fileList,
        });
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上传文件"
            >
              {
                getFieldDecorator('file', {
                  rules: [{
                    required: true, message: '请上传文件',
                  }],
                })(
                  <Upload {...props}>
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button loading={loading} type="primary" htmlType="submit">
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}

