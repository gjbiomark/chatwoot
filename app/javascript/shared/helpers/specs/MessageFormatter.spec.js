import MessageFormatter from '../MessageFormatter';

describe('#MessageFormatter', () => {
  describe('content with links', () => {
    it('should format correctly', () => {
      const message =
        'This is a Biomark Internal Messaging app [Biomark](https://www.biomarking.com)';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>This is a Biomark Internal Messaging app <a href="https://www.biomarking.com" class="link" rel="noreferrer noopener nofollow" target="_blank">Biomark</a></p>'
      );
    });
    it('should format correctly', () => {
      const message =
        'This is a Biomark Internal Messaging app https://www.biomarking.com';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>This is a Biomark Internal Messaging app <a href="https://www.biomarking.com" class="link" rel="noreferrer noopener nofollow" target="_blank">https://www.biomarking.com</a></p>'
      );
    });
  });

  describe('parses heading to strong', () => {
    it('should format correctly', () => {
      const message = '### opensource \n ## tool';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        `<h3>opensource</h3>
<h2>tool</h2>`
      );
    });
  });

  describe('tweets', () => {
    it('should return the same string if not tags or @mentions', () => {
      const message = 'Chatwoot is an opensource tool';
      expect(new MessageFormatter(message).formattedMessage).toMatch(message);
    });

    it('should add links to @mentions', () => {
      const message =
        '@This is a Biomark Internal Messaging app thanks @longnonexistenttwitterusername';
      expect(
        new MessageFormatter(message, true, false).formattedMessage
      ).toMatch(
        '<p><a href="http://twitter.com/biomark" class="link" rel="noreferrer noopener nofollow" target="_blank">@this</a> is a Biomark Internal Messaging app thanks @longnonexistenttwitterusername</p>'
      );
    });

    it('should add links to #tags', () => {
      const message = '#This is a Biomark Internal Messaging app';
      expect(
        new MessageFormatter(message, true, false).formattedMessage
      ).toMatch(
        '<p><a href="https://twitter.com/hashtag/biomark" class="link" rel="noreferrer noopener nofollow" target="_blank">#this</a> is a Biomark Internal Messaging app</p>'
      );
    });
  });

  describe('private notes', () => {
    it('should return the same string if not tags or @mentions', () => {
      const message = 'This is a Biomark Internal Messaging app';
      expect(new MessageFormatter(message).formattedMessage).toMatch(message);
    });

    it('should add links to @mentions', () => {
      const message =
        '@this is a Biomark Internal Messaging app thanks @longnonexistenttwitterusername';
      expect(
        new MessageFormatter(message, false, true).formattedMessage
      ).toMatch(message);
    });

    it('should add links to #tags', () => {
      const message = '#this is a Biomark Internal Messaging app';
      expect(
        new MessageFormatter(message, false, true).formattedMessage
      ).toMatch(message);
    });
  });

  describe('plain text content', () => {
    it('returns the plain text without HTML', () => {
      const message =
        '<b>This is a Biomark Internal Messaging app https://www.biomarking.com</b>';
      expect(new MessageFormatter(message).plainText).toMatch(
        'This is a Biomark Internal Messaging app https://www.biomarking.com'
      );
    });
  });

  describe('#sanitize', () => {
    it('sanitizes markup and removes all unnecessary elements', () => {
      const message =
        '[xssLink](javascript:alert(document.cookie))\n[normalLink](https://google.com)**I am a bold text paragraph**';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        `<p>[xssLink](javascript:alert(document.cookie))<br />
<a href="https://google.com" class="link" rel="noreferrer noopener nofollow" target="_blank">normalLink</a><strong>I am a bold text paragraph</strong></p>`
      );
    });
  });
});
