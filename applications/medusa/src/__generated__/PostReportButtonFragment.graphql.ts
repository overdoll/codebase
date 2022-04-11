/**
 * @generated SignedSource<<7db47c8a8b5d53bc06dee1c89c286b5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReportButtonFragment$data = {
  readonly id: string;
  readonly reference: string;
  readonly club: {
    readonly slug: string;
  };
  readonly " $fragmentType": "PostReportButtonFragment";
};
export type PostReportButtonFragment = PostReportButtonFragment$data;
export type PostReportButtonFragment$key = {
  readonly " $data"?: PostReportButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostReportButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostReportButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "8a9fe0c8acc1d87f4e01bf8e4fa0d96f";

export default node;
