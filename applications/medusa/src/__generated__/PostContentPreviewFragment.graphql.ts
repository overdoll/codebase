/**
 * @generated SignedSource<<98d475d6e90c20fc67ac9f3b53edf117>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewFragment$data = {
  readonly id: string;
  readonly isSupporterOnly: boolean;
  readonly media: {
    readonly __typename: "RawMedia";
    readonly failed: boolean;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly " $fragmentSpreads": FragmentRefs<"ExpandableResourceInfoFragment" | "PostContentPreviewMenuFragment" | "RemovePostContentButtonFragment" | "SupporterPostContentButtonFragment">;
  readonly " $fragmentType": "PostContentPreviewFragment";
};
export type PostContentPreviewFragment$key = {
  readonly " $data"?: PostContentPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentPreviewFragment",
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
      "name": "isSupporterOnly",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "media",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "failed",
              "storageKey": null
            }
          ],
          "type": "RawMedia",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostContentPreviewMenuFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupporterPostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExpandableResourceInfoFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "c3ddd62399b70d825b03f5272ed16c45";

export default node;
