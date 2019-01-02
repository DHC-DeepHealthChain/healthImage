import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import styles from './Table.less';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export default ({ list, onPreview, ...tableProps }) => {
  const columns = [
    {
      title: '上传时间',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: val => (
        moment(new Date(val)).format(dateFormat)
      ),
    },
    {
      title: '文件标题',
      dataIndex: 'fileTitle',
      key: 'fileTitle',
      width: 150,
    },
    {
      title: '文件类型',
      dataIndex: 'fileType',
      key: 'fileType',
    },
    {
      title: 'ipfs地址（该地址可在ipfs官网https://ipfs.io/ipfs/查看）',
      dataIndex: 'ipfsHash',
      key: 'ipfsHash',
    },
    {
      title: '操作',
      render: (val, record) => {
        return (
          <a onClick={() => { onPreview(record.ipfsHash); }}>查看文件</a>
        );
      },
    },
  ];

  return (
    <div className={styles.standardTable}>
      <Table
        rowKey={record => record.createdDate}
        dataSource={list}
        columns={columns}
        scroll={{ x: 1200 }}
        {...tableProps}
      />
    </div>
  );
};
