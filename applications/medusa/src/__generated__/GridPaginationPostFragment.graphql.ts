/**
 * @generated SignedSource<<1399731ae729573f053b5e626054cd9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GridPaginationPostFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"GridPaginationPostContentFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"MenuSimplePublicPostFragment" | "PostLinkTileFragment">;
  readonly " $fragmentType": "GridPaginationPostFragment";
};
export type GridPaginationPostFragment$key = {
  readonly " $data"?: GridPaginationPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GridPaginationPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridPaginationPostFragment",
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
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "GridPaginationPostContentFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLinkTileFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MenuSimplePublicPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "a46adda17c6c2267d2319141842760ba";

export default node;
