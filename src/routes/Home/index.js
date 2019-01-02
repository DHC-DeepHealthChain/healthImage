import React, { Component } from 'react';
import { connect } from 'dva';
import { Avatar, Button, Modal } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import HistoryTable from './Table';
import Upload from './Upload';

import styles from './index.less';

@connect(({ home, user }) => ({
  home,
  user,
}))
export default class Home extends Component {
  state = {
    modalVisible: false,
    previewModal: false,
    submitLoading: false,
  };
  componentDidMount() {
    this.getList();
  }

  getList = (page = 0, pageSize = 10) => {
    const { dispatch } = this.props;
    return dispatch({
      type: 'home/queryList',
      payload: {
        fileType: 'Image',
        page,
        pageSize,
      },
    });
  };

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handlePreviewModalVisible = (flag) => {
    this.setState({
      previewModal: !!flag,
    });
  };

  handleUpload = (values) => {
    const fileType = 'Image';
    const { dispatch } = this.props;
    const {
      title,
      file: {
        file: {
          response: { result },
        },
      },
    } = values;
    const data = {
      fileTitle: title,
      fileType,
      hash: result.documentHash,
    };
    this.setState({
      submitLoading: true,
    });
    const upload = dispatch({
      type: 'home/uploadInfo',
      payload: data,
    });
    upload.then(() => {
      this.setState({
        modalVisible: false,
        submitLoading: false,
      });
      this.getList();
    });
  };

  uploadDocument = () => {
    this.handleModalVisible(true);
  };

  render() {
    const { modalVisible, previewModal, submitLoading } = this.state;
    const {
      dispatch,
      user: { currentUser },
      home: { list, loading, pagination, base64 },
    } = this.props;
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            手机号：{currentUser.username}
          </div>
          <div>公钥地址：{currentUser.address}</div>
        </div>
        <Button size="large" type="primary" onClick={this.uploadDocument}>
          上传
        </Button>
      </div>
    );

    const tableProps = {
      list,
      loading,
      pagination,
      title: () => (
        <div>
          <h3 style={{ paddingLeft: '16px' }}>上传记录</h3>
        </div>
      ),
      onChange: (page) => {
        this.getList(page.current, page.pageSize);
      },
      onPreview: (hash) => {
        dispatch({
          type: 'home/getImage',
          payload: {
            hash,
          },
        });
        this.handlePreviewModalVisible(true);
      },
    };

    return (
      <PageHeaderLayout content={pageHeaderContent}>
        <Modal
          title="上传文档"
          visible={modalVisible}
          onCancel={() => {
            this.handleModalVisible();
          }}
          maskClosable={false}
          destroyOnClose
          width="80%"
          footer={null}
        >
          <Upload loading={submitLoading} submit={this.handleUpload} />
        </Modal>
        <Modal
          title="预览"
          visible={previewModal}
          onCancel={() => {
            this.handlePreviewModalVisible();
          }}
          maskClosable={false}
          destroyOnClose
          width="80%"
          footer={null}
        >
          <div>
            <img style={{ width: '100%' }} src={base64} alt="" />
          </div>
        </Modal>
        <HistoryTable {...tableProps} />
      </PageHeaderLayout>
    );
  }
}
