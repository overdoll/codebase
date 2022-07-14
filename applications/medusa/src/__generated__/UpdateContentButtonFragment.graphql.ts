/**
 * @generated SignedSource<<2b37082ebb10c103ddfe71d1f6fc1d28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateContentButtonFragment$data = {
  readonly content: ReadonlyArray<{
    readonly __typename: "PostContent";
  }>;
  readonly " $fragmentType": "UpdateContentButtonFragment";
};
export type UpdateContentButtonFragment$key = {
  readonly " $data"?: UpdateContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdateContentButtonFragment",
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
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "00246c3a5eab1aea960a80ec2c774d50";

export default node;
