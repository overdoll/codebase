/**
 * @generated SignedSource<<c60df4e68a626532680d7aee62e4ae8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostSlideIndexFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly isSupporterOnly: boolean;
    readonly resource: {
      readonly type: ResourceType;
    };
    readonly " $fragmentSpreads": FragmentRefs<"PostSlideIndexMediaFragment">;
  }>;
  readonly reference: string;
  readonly " $fragmentType": "PostSlideIndexFragment";
};
export type PostSlideIndexFragment$key = {
  readonly " $data"?: PostSlideIndexFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSlideIndexFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSlideIndexFragment",
  "selections": [
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostSlideIndexMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ca5227e36404a6bd5961e69da43ca235";

export default node;
