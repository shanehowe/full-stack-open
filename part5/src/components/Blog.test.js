import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';


describe('When rendering a blog', () => {
  const blog = {
    url: 'https://www.fakeblog.com',
    author: 'Some Guy',
    title: 'Testing is important',
    likes: 1,
    user: {
      id: 12345,
      username: 'Shane'
    }
  };

  test('Initially only the blogs title and author is displayed', () => {
    render(<Blog blog={blog} />);

    const renderedElement = screen.getByText('Testing is important', { exact: false });
    expect(renderedElement).toBeDefined();

    const notRenderedLikes = screen.queryByText(`Likes: ${1}`);
    expect(notRenderedLikes).toBeNull();

    const notRenderedURL = screen.queryByText('https://www.fakeblog.com');
    expect(notRenderedURL).toBeNull();
  });

  test('after clicking the show button the url and likes are displayed', () => {
    render(<Blog blog={blog}/>);

    const user = userEvent.setup();
    const button = screen.getByText('View');
    user.click(button);

    const elementURL = screen.queryByText('https://www.fakeblog.com');
    expect(elementURL).toBeDefined();

    const elementLikes = screen.queryByText(`Likes: ${1}`);
    expect(elementLikes).toBeDefined();
  });
});

describe('When clicking the like button twice', () => {
  test('The event handler is called twice', async () => {
    const blog = {
      url: 'https://www.fakeblog.com',
      author: 'Some Guy',
      title: 'Testing is important',
      likes: 1,
      user: {
        id: 12345,
        username: 'Shane'
      }
    };
    const mockHandler = jest.fn();

    render(<Blog blog={blog} updateLikes={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const likesButton = screen.getByText('like');
    await user.click(likesButton);
    await user.click(likesButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});