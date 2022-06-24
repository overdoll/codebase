/**
 * @generated SignedSource<<96f73f92794a6c8ac2551d5dbea237f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RuleTileOverlayFragment$data = {
  readonly description: string;
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "RuleTileOverlayFragment";
};
export type RuleTileOverlayFragment$key = {
  readonly " $data"?: RuleTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RuleTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RuleTileOverlayFragment",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "1403c5867c11b52641ef750c6f078bd9";

export default node;
