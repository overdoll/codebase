/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostArtistFragment$ref: FragmentReference;
declare export opaque type PostArtistFragment$fragmentType: PostArtistFragment$ref;
export type PostArtistFragment = {|
  +artist: {|
    +username: string
  |},
  +$refType: PostArtistFragment$ref,
|};
export type PostArtistFragment$data = PostArtistFragment;
export type PostArtistFragment$key = {
  +$data?: PostArtistFragment$data,
  +$fragmentRefs: PostArtistFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostArtistFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'ea4f2ad951ac943536ee03d21efd746e';
module.exports = node;
