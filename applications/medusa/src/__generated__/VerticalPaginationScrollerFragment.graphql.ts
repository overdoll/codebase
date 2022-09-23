/**
 * @generated SignedSource<<971acd075cefc143b97f2041ba54290b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VerticalPaginationScrollerFragment$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly id: string;
    };
  }>;
  readonly " $fragmentType": "VerticalPaginationScrollerFragment";
};
export type VerticalPaginationScrollerFragment$key = {
  readonly " $data"?: VerticalPaginationScrollerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"VerticalPaginationScrollerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VerticalPaginationScrollerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Post",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostConnection",
  "abstractKey": null
};

(node as any).hash = "ce2e327cb13d49a1eed8b784b2145bad";

export default node;
