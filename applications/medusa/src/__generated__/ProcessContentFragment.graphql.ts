/**
 * @generated SignedSource<<04912687f769492cf1f9006289e42922>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProcessContentFragment$data = {
  readonly content: ReadonlyArray<{
    readonly resource: {
      readonly processed: boolean;
    };
  }>;
  readonly reference: string;
  readonly " $fragmentType": "ProcessContentFragment";
};
export type ProcessContentFragment$key = {
  readonly " $data"?: ProcessContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProcessContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProcessContentFragment",
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
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "processed",
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

(node as any).hash = "5349f96bdfc0b1b4fc7586e81fc35d8d";

export default node;
