/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostCharactersFragment$ref: FragmentReference;
declare export opaque type PostCharactersFragment$fragmentType: PostCharactersFragment$ref;
export type PostCharactersFragment = {|
  +characters: $ReadOnlyArray<{|
    +name: string,
    +series: {|
      +title: string
    |},
  |}>,
  +$refType: PostCharactersFragment$ref,
|};
export type PostCharactersFragment$data = PostCharactersFragment;
export type PostCharactersFragment$key = {
  +$data?: PostCharactersFragment$data,
  +$fragmentRefs: PostCharactersFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Series",
          "kind": "LinkedField",
          "name": "series",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            }
          ],
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
(node: any).hash = 'd0e57e5f22fd7d3231cd163d507ba546';
module.exports = node;
