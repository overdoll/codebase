/**
 * @generated SignedSource<<b9a03d7fafa1f4a250c1a09eb06d8f6e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CopyLinkPublicPostFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly id: string;
  readonly reference: string;
  readonly " $fragmentType": "CopyLinkPublicPostFragment";
};
export type CopyLinkPublicPostFragment$key = {
  readonly " $data"?: CopyLinkPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CopyLinkPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CopyLinkPublicPostFragment",
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

(node as any).hash = "d1546e13a693b71ab716f3c8b9d6ed26";

export default node;
