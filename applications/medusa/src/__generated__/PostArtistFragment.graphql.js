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
  +brand: ?{|
    +name: string
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
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
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
(node: any).hash = '36b353b6f4f7f7611dec324d49b9cae7';
module.exports = node;
