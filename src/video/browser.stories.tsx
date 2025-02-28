import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Browser from './browser';

const meta = {
    title: 'Video/Browser',
    component: Browser,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Browser>;

export default meta;
type Story = StoryObj<typeof Browser>;

export const Default: Story = {
    args: {
        initialUrl: 'https://example.com',
    },
};

export const WithCustomURL: Story = {
    args: {
        initialUrl: 'https://google.com',
    },
};

export const WithNavigationCallback: Story = {
    args: {
        initialUrl: 'https://example.com',
        onNavigate: (url: string) => {
            console.log('Navigating to:', url);
        },
    },
};

export const DifferentSizes: Story = {
    decorators: [
        (Story) => (
            <div style={{ padding: '20px' }}>
                <Story />
            </div>
        ),
    ],
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ width: '800px' }}>
                <Browser initialUrl="https://example.com" />
            </div>
            <div style={{ width: '600px' }}>
                <Browser initialUrl="https://example.com" />
            </div>
            <div style={{ width: '400px' }}>
                <Browser initialUrl="https://example.com" />
            </div>
        </div>
    ),
}; 