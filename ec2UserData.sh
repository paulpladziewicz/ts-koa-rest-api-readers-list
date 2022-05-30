#!/bin/bash
yum update -y
yum upgrade -y
yum install -y amazon-linux-extras
yum -y install curl
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
yum install -y nodejs
amazon-linux-extras install nginx1 -y
systemctl restart nginx
CODEDEPLOY_BIN="/opt/codedeploy-agent/bin/codedeploy-agent"
$CODEDEPLOY_BIN stop
yum erase codedeploy-agent -y
yum install ruby -y
sudo yum install wget
cd /home/ec2-user
wget https://aws-codedeploy-us-east-2.s3.us-east-2.amazonaws.com/latest/install
chmod +x ./install
./install auto
mkdir api
npm install pm2 -g
systemctl stop nginx
wget -r --no-parent -A 'epel-release-*.rpm' https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/
rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-*.rpm
yum-config-manager --enable epel*
yum install -y certbot
yum install -y python-certbot-nginx
systemctl start nginx