import * as path from 'path';
import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
//@ts-ignore
import { default as ZipWebpackPlugin } from 'zip-webpack-plugin';

import * as pkg from './package.json';

function manifestTransformer(manifestBuffer: Buffer): Buffer {
  const manifestString = manifestBuffer.toString().replace(/\$\{version\}/g, pkg.version);
  return Buffer.from(manifestString);
}

const commonConfig: webpack.Configuration = {
  entry: {
    popup: './src/popup.ts',
    contentScript: './src/contentScript.ts',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          transform: manifestTransformer,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'images',
          to: 'images/',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: './src/popup.html',
      excludeChunks: ['contentScript'],
    }),
    new MiniCssExtractPlugin(),
  ],
};

const productionConfig: webpack.Configuration = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new ZipWebpackPlugin({
      filename: 'sorryfield-extension.zip',
    }),
  ],
};

const developmentConfig: webpack.Configuration = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
};

export default function (_: any, argv: any) {
  switch (argv.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw '지원되는 타입: development | production';
  }
}
