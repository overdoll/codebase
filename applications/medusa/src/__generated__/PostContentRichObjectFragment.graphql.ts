/**
 * @generated SignedSource<<ec400ddfde0a679d62415cc62ab07b2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentRichObjectFragment$data = {
  readonly content: ReadonlyArray<{
    readonly media: {
      readonly " $fragmentSpreads": FragmentRefs<"MediaRichObjectFragment">;
    };
  }>;
  readonly " $fragmentType": "PostContentRichObjectFragment";
};
export type PostContentRichObjectFragment$key = {
  readonly " $data"?: PostContentRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentRichObjectFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "media",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "MediaRichObjectFragment"
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

(node as any).hash = "ce0a5b383ad29f560bc98155519f5bc2";

export default node;
