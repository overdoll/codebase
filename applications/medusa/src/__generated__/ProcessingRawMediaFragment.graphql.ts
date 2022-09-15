/**
 * @generated SignedSource<<43fce46c285588375a3893562c75b5b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MediaProgressState = "FINALIZING" | "STARTED" | "WAITING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ProcessingRawMediaFragment$data = {
  readonly failed: boolean;
  readonly originalFileName: string;
  readonly progress: {
    readonly progress: number;
    readonly state: MediaProgressState;
  } | null;
  readonly " $fragmentType": "ProcessingRawMediaFragment";
};
export type ProcessingRawMediaFragment$key = {
  readonly " $data"?: ProcessingRawMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProcessingRawMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProcessingRawMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "failed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MediaProgress",
      "kind": "LinkedField",
      "name": "progress",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "progress",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "state",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "originalFileName",
      "storageKey": null
    }
  ],
  "type": "RawMedia",
  "abstractKey": null
};

(node as any).hash = "68873c4462da420b3a1c43ab01e4240c";

export default node;
