import * as path from 'path';
import * as webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
//@ts-ignore
import { default as CopyWebpackPlugin } from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
//@ts-ignore
import { default as MiniCssExtractPlugin, loader as MiniCssExtractLoader } from 'mini-css-extract-plugin';
//@ts-ignore
import { default as CssMinimizerWebpackPlugin } from 'css-minimizer-webpack-plugin';
//@ts-ignore
import { default as TerserWebpackPlugin } from 'terser-webpack-plugin';

import * as pkg from './package.json';

function manifestTransformer(manifestBuffer: Buffer, path: String): Buffer {
  const manifestString = manifestBuffer.toString().replace(/\$\{version\}/g, pkg.version);
  return Buffer.from(manifestString);
}

const config: webpack.Configuration = {
  mode: 'production',
  entry: {
    popup: './src/popup.ts',
    autoLogin: './src/autoLogin.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractLoader, 'css-loader'],
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
      excludeChunks: ['autoLogin'],
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        parallel: true,
      }),
    ],
  },
};

export default config;
