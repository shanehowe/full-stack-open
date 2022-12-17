import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BlogForm } from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm/> updates parent state and calls onSubmit', async () => {
  const mockHandler = jest.fn();

  const { container } = render(<BlogForm addNewBlog={mockHandler} />);

  const authorInput = container.querySelector('#authorInput');
  const titleInput = container.querySelector('#titleInput');
  const urlInput = container.querySelector('#urlInput');
  const createButton = screen.getByText('Create');

  await userEvent.type(authorInput, 'Shane Howe');
  await userEvent.type(titleInput, 'Testing is fun');
  await userEvent.type(urlInput, 'https://www.fakeblog.com');
  await userEvent.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  const mockBlog = mockHandler.mock.calls[0][0];
  expect(mockBlog.author).toBe('Shane Howe');
  expect(mockBlog.title).toBe('Testing is fun');
  expect(mockBlog.url).toBe('https://www.fakeblog.com');
});